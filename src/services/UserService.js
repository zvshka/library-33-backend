import ApiError from "../exceptions/ApiError";
import {compare, hash} from "bcrypt";
import UserDTO from "../DTO/UserDTO";
import {findToken, generateTokens, removeToken, saveToken, validateRefreshToken} from "./TokenService";
import prisma from "../lib/prisma";

export default class UserService {
    static async registration(name, email, password) {
        const candidates = await prisma.user.findMany({
            where: {
                OR: [{name}, {email}]
            }
        })
        if (candidates.length > 0) {
            throw ApiError.BadRequest(`Пользователь с ${email} или ${name} уже существует`)
        }
        const hashPassword = await hash(password, 3);
        // TODO Email activation
        const user = await prisma.user.create({
            data: {
                name, email, password: hashPassword
            }
        })
        const userDto = new UserDTO(user);
        const tokens = generateTokens({...userDto});
        await saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    static async login(email, password) {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (!user) {
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }
        const isPassEquals = await compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль');
        }
        const userDto = new UserDTO(user);
        const tokens = generateTokens({...userDto});

        await saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    static async logout(refreshToken) {
        return await removeToken(refreshToken)
    }

    static async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = validateRefreshToken(refreshToken);
        const tokenFromDb = await findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userData.id
            }
        })
        const userDto = new UserDTO(user);
        const tokens = generateTokens({...userDto});

        await saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }
}
import registerSchema, {joiSchema} from "../schemas/User/register.schema";
import loginSchema from "../schemas/User/login.schema"
import UserService from "../services/UserService";

export const swUserController = {
    register: {
        "summary": "Создать нового пользователя",
        "tags": [
            "User"
        ],
        "requestBody": {
            "content": {
                "application/json": {
                    "schema": {
                        ...registerSchema
                    }
                }
            }
        },
        "responses": {
            "200": {
                "description": "Пользователь создан"
            },
            "default": {
                "description": "Сообщение с ошибкой"
            }
        }
    },
    login: {
        summary: "Войти в систему",
        tags: ["User"],
        requestBody: {
            content: {
                "application/json": {
                    schema: {
                        ...loginSchema
                    }
                }
            }
        },
        responses: {
            "200": {
                description: "Успешный вход"
            },
            "default": {
                description: "Сообщение с ошибкой"
            }
        }
    },
    logout: {

    },
    refresh: {

    },
}

export class UserController {
    static async registration(req, res, next) {
        try {
            await joiSchema.validateAsync(req.body)
            const {name, email, password} = req.body
            const userData = await UserService.registration(name, email, password)
            res.cookie("refreshToken", userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e)
        }
    }

    static async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await UserService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    static async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await UserService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            next(e);
        }
    }

    static async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await UserService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
}
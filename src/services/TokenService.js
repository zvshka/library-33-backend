import jwt from "jsonwebtoken"
import prisma from "../lib/prisma";

export const generateTokens = (payload) => {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '1d'})
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
    return {
        accessToken,
        refreshToken
    }
}

export const validateAccessToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (e) {
        return null;
    }
}

export const validateRefreshToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (e) {
        return null;
    }
}

export const saveToken = async (userId, refreshToken) => {
    const tokenData = await prisma.token.findUnique({
        where: {
            user_id: userId
        }
    })
    if (tokenData) {
        return await prisma.token.update({
            where: {
                user_id: userId
            },
            data: {
                refreshToken
            }
        })
    }
    return await prisma.token.create({
        data: {
            user_id: userId,
            refreshToken
        }
    })
}

export const removeToken = async (refreshToken) => {
    return await prisma.token.delete({
        where: {
            refreshToken
        }
    })
}

export const findToken = async (refreshToken) => {
    return await prisma.token.findUnique({
        where: {
            refreshToken
        }
    })
}
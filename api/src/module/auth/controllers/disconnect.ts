import type { Request, Response } from "express"
import { TokenService } from "@auth/services"
import { TokenRepository } from "@auth/repository"
import { AppError, catchError } from "@error"

const disconnect = catchError(async (req: Request, res: Response) => {
  const { rt: refreshToken } = req.cookies
  if (!refreshToken) throw new AppError('No Content - Refresh token not found', 400)

  const tokenData = await TokenRepository.findOne({ token: refreshToken })
  if (tokenData === null) throw new AppError('No Content', 404)

  const response = await TokenService.revoke(res, { cookie: 'rt', token: refreshToken })

  return response.status(200).json({})
})

export { disconnect }
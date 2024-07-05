"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        _id: zod_1.z.string().optional(),
        name: zod_1.z.string({
            required_error: 'name is required',
        }),
        password: zod_1.z.string({
            required_error: 'password is required',
        }),
        email: zod_1.z.string({
            required_error: 'email is required',
        }).email(),
        phone_number: zod_1.z.string({
            required_error: 'phone_number is required',
        }),
    }),
});
// const createUserZodSchema = z.object({
//   body: z.object({
//     name: z.string({
//       required_error: 'name is required',
//     }),
//     email: z.string({
//       required_error: 'email is required',
//     }),
//     password: z.string({
//       required_error: 'password is required',
//     }),
//   }),
// });
const loginUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: 'email is required',
        }),
        password: zod_1.z.string({
            required_error: 'password is required',
        })
    }),
});
const refreshTokenZodSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'Refresh Token is required',
        }),
    }),
});
const changePassWordZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: 'email is required',
        }),
        oldPassword: zod_1.z.string({
            required_error: 'oldPassword is required',
        }),
        newPassword: zod_1.z.string({
            required_error: 'newPassword is required',
        }),
    }),
});
exports.AuthValidation = {
    createUserZodSchema,
    loginUserZodSchema,
    refreshTokenZodSchema,
    changePassWordZodSchema
};

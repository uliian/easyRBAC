﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using EasyRbac.Application.Login;
using EasyRbac.Application.User;
using EasyRbac.Domain.Entity;
using EasyRbac.Dto.AppLogin;
using EasyRbac.Dto.AppResource;
using EasyRbac.Dto.User;
using Microsoft.AspNetCore.Mvc;

namespace EasyRbac.Web.Controllers.SsoApi
{
    public class AppLoginController : Controller
    {
        private readonly ILoginService _loginService;
        private readonly IUserService _userService;

        public AppLoginController(ILoginService loginService)
        {
            this._loginService = loginService;
        }

        public Task<AppLoginResult> AppLogin(AppLoginDto dto)
        {
            return this._loginService.AppLoginAsync(dto);
        }

        public async Task<UserInfoDto> GetUserInfo(string appToken, string userToken)
        {
            (var userId, var appId) = await this.GetBaseInfo(userToken);

            return await this._userService.GetUserInfo(userId);
        }

        [HttpGet("resource/{userToken}")]
        public async Task<List<AppResourceDto>> GetUserResources(string userToken)
        {
            (var userId, var appId) = await this.GetBaseInfo(userToken);
            var result = await this._loginService.GetUserAppResourcesAsync(userId, appId);
            return result;
        }

        private async Task<(long, long)> GetBaseInfo(string userToken)
        {
            LoginTokenEntity userTokenEntity = await this._loginService.GetEntityByTokenAsync(userToken);
            var identity = this.User.Identity as ClaimsIdentity;
            var appId = long.Parse(identity.Actor.Name);
            return (userTokenEntity.UserId,appId);
        }
    }
}

using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Api.Services.Application.Profiles;
using Microsoft.AspNetCore.Mvc;

namespace Api.Application.Controllers
{
    public class ProfilesController : BaseApiController
    {
        [HttpGet("{username}")]
        public async Task<IActionResult> GetProfile(string username)
        {
            var result = await Mediator.Send(new Details.Query { Username = username });

            return HandleResult(result);
        }
    }
}
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Api.Services.Application.Followers;
using Microsoft.AspNetCore.Mvc;

namespace Api.Application.Controllers
{
    public class FollowController : BaseApiController
    {
        [HttpPost("{username}")]
        public async Task<IActionResult> Index(string username)
        {
            var result = await Mediator.Send(new FollowerToggle.Command { TargetUsername = username });

            return HandleResult(result);
        }

    }
}
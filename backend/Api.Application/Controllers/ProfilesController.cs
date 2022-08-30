using System.Threading.Tasks;
using Api.Domain.DTOs.Profile;
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

        [HttpPut("editProfile")]
        public async Task<IActionResult> Edit(ProfileDto profile)
        {
            var result = await Mediator.Send(new Edit.Command { Profile = profile});

            return HandleResult(result);
        }

        [HttpGet("{username}/activities")]
        public async Task<IActionResult> ListUserActivities(string username, string predicate)
        {
            var result = await Mediator.Send(new ListActivities.Query { Username = username, Predicate = predicate });

            return HandleResult(result);
        }
    }
}
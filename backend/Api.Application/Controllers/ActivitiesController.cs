using System;
using System.Threading.Tasks;
using Api.Services.Activitities;
using Microsoft.AspNetCore.Mvc;

namespace Api.Application.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetActivities()
        {
            return Ok(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            return Ok();
        }
    }
}
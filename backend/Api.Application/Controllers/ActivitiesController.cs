using System;
using System.Threading.Tasks;
using Api.Domain.Entities;
using Api.Services.Application.Activitities;
using Api.Services.Application.Attendee;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Application.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetActivities()
        {
            var result = await Mediator.Send(new List.Query());

            return HandleResult(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var result = await Mediator.Send(new Details.Query { Id = id });

            return HandleResult(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Activity activity)
        {
            var result = await Mediator.Send(new Create.Command { Activity = activity });

            return HandleResult(result);
        }

        [HttpPut]
        public async Task<IActionResult> Edit(Activity activity)
        {
            return HandleResult(await Mediator.Send(new Edit.Command { Activity = activity }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }

        [HttpPost("{id}/attende")]
        [Authorize(Policy = "IsActivityHost")]
        public async Task<IActionResult> Attende(Guid id)
        {
            return HandleResult(await Mediator.Send(new UpdateAttendance.Command { Id = id }));
        }
    }
}
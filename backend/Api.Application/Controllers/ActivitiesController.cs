using System;
using System.Threading.Tasks;
using Api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Application.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        private readonly IActivitiesService _activitiesService;

        public ActivitiesController(IActivitiesService activitiesService)
        {
            _activitiesService = activitiesService;
        }

        [HttpGet]
        public async Task<IActionResult> GetActivities()
        {
            return Ok(await _activitiesService.GetAllAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            return Ok(await _activitiesService.GetAsync(id));
        }
    }
}
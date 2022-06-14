using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Domain.Entities;

namespace Api.Services.Interfaces
{
    public interface IActivitiesService
    {
        Task<IEnumerable<Activity>> GetAllAsync();
        Task<Activity> GetAsync(Guid id);
    }
}
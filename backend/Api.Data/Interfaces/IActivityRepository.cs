using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Domain.Entities;

namespace Api.Data.Interfaces
{
    public interface IActivityRepository : IRepository<Activity>
    {
        Task<Activity> GetByIdAsync(Guid id);
    }
}
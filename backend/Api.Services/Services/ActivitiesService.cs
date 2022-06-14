using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Data.Transaction;
using Api.Domain.Entities;
using Api.Services.Interfaces;

namespace Api.Services.Services
{
    public class ActivitiesService : IActivitiesService
    {
        private readonly IUow _unitOfWork;

        public ActivitiesService(IUow unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<Activity>> GetAllAsync()
        {
            var list = await _unitOfWork.Activities.GetAllAsync();

            return list;
        }

        public async Task<Activity> GetAsync(Guid id)
        {
            var activity = await _unitOfWork.Activities.GetAsync(id);

            return activity;
        }
    }
}
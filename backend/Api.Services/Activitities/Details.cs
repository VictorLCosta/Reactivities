using System;
using System.Threading;
using System.Threading.Tasks;
using Api.Data.Transaction;
using Api.Domain.Entities;
using MediatR;

namespace Api.Services.Activitities
{
    public class Details
    {
        public class Query : IRequest<Activity> 
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Activity>
        {
            private readonly IUow _unitOfWork;

            public Handler(IUow unitOfWork)
            {
                _unitOfWork = unitOfWork;
            }

            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _unitOfWork.Activities.GetAsync(request.Id);
            }
        }
    }
}
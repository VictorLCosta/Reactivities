using System;
using System.Threading;
using System.Threading.Tasks;
using Api.Data.Transaction;
using Api.Domain.Entities;
using Api.Services.Core;
using MediatR;

namespace Api.Services.Activitities
{
    public class Details
    {
        public class Query : IRequest<Result<Activity>> 
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Activity>>
        {
            private readonly IUow _unitOfWork;

            public Handler(IUow unitOfWork)
            {
                _unitOfWork = unitOfWork;
            }

            public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await _unitOfWork.Activities.GetAsync(request.Id);

                return Result<Activity>.Success(activity);
            }
        }
    }
}
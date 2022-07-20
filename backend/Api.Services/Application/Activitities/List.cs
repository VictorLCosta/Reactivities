using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Api.Data.Transaction;
using Api.Domain.Entities;
using Api.Services.Core;
using MediatR;

namespace Api.Services.Application.Activitities
{
    public class List
    {
        public class Query : IRequest<Result<IEnumerable<Activity>>> {}

        public class Handler : IRequestHandler<Query, Result<IEnumerable<Activity>>>
        {
            private readonly IUow _unitOfWork;

            public Handler(IUow unitOfWork)
            {
                _unitOfWork = unitOfWork;
            }

            public async Task<Result<IEnumerable<Activity>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<IEnumerable<Activity>>.Success(await _unitOfWork.Activities.GetAllAsync());
            }
        }
    }
}
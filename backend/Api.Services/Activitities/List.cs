using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Api.Data.Transaction;
using Api.Domain.Entities;
using MediatR;

namespace Api.Services.Activitities
{
    public class List
    {
        public class Query : IRequest<IEnumerable<Activity>> {}

        public class Handler : IRequestHandler<Query, IEnumerable<Activity>>
        {
            private readonly IUow _unitOfWork;

            public Handler(IUow unitOfWork)
            {
                _unitOfWork = unitOfWork;
            }

            public async Task<IEnumerable<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _unitOfWork.Activities.GetAllAsync();
            }
        }
    }
}
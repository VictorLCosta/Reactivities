using System.Threading;
using System.Threading.Tasks;
using Api.Data.Transaction;
using Api.Domain.Entities;
using Api.Services.Core;
using MediatR;

namespace Api.Services.Activitities
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly IUow _unitOfWork;

            public Handler(IUow unitOfWork)
            {
                _unitOfWork = unitOfWork;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _unitOfWork.Activities.Update(request.Activity);

                if (activity == null) return Result<Unit>.Failed("Failed to update activity");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
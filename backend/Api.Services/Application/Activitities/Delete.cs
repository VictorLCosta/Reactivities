using System;
using System.Threading;
using System.Threading.Tasks;
using Api.Data.Transaction;
using Api.Services.Core;
using MediatR;

namespace Api.Services.Application.Activitities
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>> 
        {
            public Guid Id { get; set; }
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
                var result = await _unitOfWork.Activities.Remove(request.Id);

                if (!result) return Result<Unit>.Failed("Failed to delete the activity");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
using System;
using System.Threading;
using System.Threading.Tasks;
using Api.Data.Transaction;
using MediatR;

namespace Api.Services.Activitities
{
    public class Delete
    {
        public class Command : IRequest 
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command> 
        {
            private readonly IUow _unitOfWork;

            public Handler(IUow unitOfWork)
            {
                _unitOfWork = unitOfWork;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                await _unitOfWork.Activities.Remove(request.Id);

                return Unit.Value;
            }
        }
    }
}
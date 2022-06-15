using System.Threading;
using System.Threading.Tasks;
using Api.Data.Transaction;
using Api.Domain.Entities;
using MediatR;

namespace Api.Services.Activitities
{
    public class Edit
    {
        public class Command : IRequest 
        {
            public Activity Activity { get; set; }
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
                await _unitOfWork.Activities.Update(request.Activity);

                return Unit.Value;
            }
        }
    }
}
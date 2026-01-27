import React from "react";

type TicketRowProps = {
  amount: string;
  promoTickets: number;
  originalTickets: number;
};

const TicketRow: React.FC<TicketRowProps> = ({
  amount,
  promoTickets,
  originalTickets,
}) => {
  const extraTickets = promoTickets - originalTickets;

  return (
    <div className="relative flex items-center justify-between rounded-2xl bg-gradient-to-r from-[#7A0000] to-[#5A0000] px-8 py-6 shadow-inner">
      {/* LEFT */}
      <div>
        <p className="text-xs tracking-widest text-white/60 uppercase">
          Single Deposit
        </p>
        <p className="text-3xl font-extrabold text-white">{amount}</p>
      </div>

      {/* DIVIDER */}
      <div className="h-12 w-px bg-white/20" />

      {/* RIGHT – EXTRA VALUE */}
      <div className="text-right">
        <div className="flex items-end justify-end gap-1">
          <span className="text-4xl font-extrabold text-yellow-400">
            +{extraTickets}
          </span>
          <span className="text-sm font-semibold text-yellow-400 tracking-widest">
            MORE
          </span>
        </div>
        <p className="text-xs font-semibold tracking-widest text-white/60">
          TICKETS
        </p>
      </div>
    </div>
  );
};

export default function DepositTicketList() {
  return (
    <div className="space-y-6">
      <TicketRow amount="RM150" promoTickets={2} originalTickets={1} />
      <TicketRow amount="RM500" promoTickets={6} originalTickets={3} />
      <TicketRow amount="RM1,500" promoTickets={16} originalTickets={8} />
    </div>
  );
}

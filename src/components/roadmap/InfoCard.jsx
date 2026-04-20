const InfoCard = ({ icon: Icon, title, value, description, accent }) => {
    return (
        <div className="rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-sm">
            <div className={`flex size-11 items-center justify-center rounded-2xl ${accent}`}>
                <Icon className="size-5" />
            </div>
            <p className="mt-4 text-xs font-black tracking-[0.18em] text-slate-400 uppercase">
                {title}
            </p>
            <p className="mt-2 text-2xl font-black tracking-tight text-slate-900">{value}</p>
            <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
        </div>
    );
};

export default InfoCard;

import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

function Row(props: any) {
    const { otherUser, amount, date, credited } = props.items;

    return (
        <div className="flex items-center justify-between px-5 py-4 transition-all duration-200 hover:bg-amber-50">
            {/* Left: User Info */}
            <div className="flex items-center gap-4">
                {/* Avatar */}
                <div
                    className={`w-11 h-11 flex items-center justify-center rounded-full font-bold text-white shadow
                        ${credited ? "bg-green-500" : "bg-red-500"}
                    `}
                >
                    {otherUser?.[0]?.toUpperCase()}
                </div>

                {/* Details */}
                <div>
                    <div className="text-gray-900 font-semibold">
                        {otherUser}
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                        <span
                            className={`flex items-center gap-1 font-medium
                                ${credited ? "text-green-600" : "text-red-600"}
                            `}
                        >
                            {credited ? (
                                <>
                                    <ArrowDownLeft size={16} />
                                    Credit
                                </>
                            ) : (
                                <>
                                    <ArrowUpRight size={16} />
                                    Debit
                                </>
                            )}
                        </span>

                        <span className="text-gray-400">•</span>

                        <span className="text-gray-600">
                            {new Date(date).toLocaleDateString()}
                        </span>
                    </div>
                </div>
            </div>

            {/* Right: Amount */}
            <div
                className={`text-lg font-bold
                    ${credited ? "text-green-600" : "text-red-600"}
                `}
            >
                {credited ? "+" : "-"}₹{Math.abs(amount)}
            </div>
        </div>
    );
}

export default Row;


export default function MyMask({isOpen, winner, onClose, value}: {value: string|null, onClose: ()=>void, winner: string|null, isOpen: boolean}){

    if (!winner || !isOpen){
        return null
    }

    return(
        <div id="modal-mask" className="fixed inset-0 flex items-center justify-center min-w-screen min-h-screen z-50 bg-black/50">
            <div id="content-mask" className="w-[500px] h-fit relativ bg-white flex flex-col rounded-lg shadow-lg p-2">
                <div className="w-full p-1 flex items-center justify-center">
                    <h2 className="font-bold text-2xl">Congratulation</h2>
                </div>
                <hr/>
                <p className="p-2">{value}</p>
                <div className="flex items-center justify-end">
                    <button onClick={onClose} id="closeBtn" className="rounded-[6px] bg-black text-white hover:bg-neutral-800 p-2">Close</button>
                </div>
            </div>
        </div>
    );

}
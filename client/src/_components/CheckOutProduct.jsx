const CheckOutProduct = ({
    name = "my first laptop",
    price = "555",
    quantity,
    image,
    
}) => {
    return (
        <div className=" flex items-start">
            <div className="flex w-full gap-5  items-start">
                <img
                    className="h-20 w-20 object-cover rounded-lg "
                    src="https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt=""
                />
                <div className=" w-full ">
                    <div className="  py-1 flex items-start gap-2">
                        <p className="text-sm ">name:</p>
                        <span className="text-sm "> {name}</span>
                    </div>
                    <div className="  py-1 flex items-start gap-2">
                        <p className="text-sm ">price:</p>
                        <span className="text-sm "> {price}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckOutProduct;

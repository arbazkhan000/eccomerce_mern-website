import PinCode from "../model/pincode.schema.js";

class PinCodeController {
    static async createPincode(req, res) {
        const { pincode } = req.body;

        try {
            if (!pincode || pinCode.length === 0) {
                return res.status(400).json({ message: "Pincode is required" });
            }

            const pinCode = await PinCode.find({ pincode:{$in:PinCode.map((p) => p.pincode)} });

            // $in means pincode filter with mongodb methods

            if (pinCode) {
                return res
                    .status(400)
                    .json({ message: "Pincode already exists" });
            }

            const newPinCode = await new PinCode({ pincode });

            // Sucecess Message

            return res.status(201).json({
                message: "Pincode added successfully",
                data: newPinCode,
                success: true,
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message,
                success: false,
            });
        }
    }
}


export default PinCodeController ;

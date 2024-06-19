
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function Paypal() {
    const initialOptions = {
        clientId: "AXQRaIK134MElmi4JFydESD3i4qQNrZsfzNHCBsUHVj9_SRYJIbhxF3NMhiM7qNxOlV83qJ0XzonKiAx",
        // Add other options as needed
    };
    return (
        <div className="App">
            <PayPalScriptProvider options={initialOptions}>
                <PayPalButtons />
            </PayPalScriptProvider>
        </div>
    );
}

export default Paypal
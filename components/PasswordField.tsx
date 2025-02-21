import React, { useState } from 'react';
import { FormControl, FormControlLabel, FormControlLabelText, FormControlError, FormControlErrorIcon, FormControlErrorText } from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { AlertCircleIcon, EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import {TouchableOpacity} from "react-native";  // Assume the icons are imported from the appropriate library

const PasswordField = () => {
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State for password visibility

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prevState) => !prevState);
    };

    return (
        <FormControl isInvalid={!!passwordError} size="md" isRequired>
            <FormControlLabel>
                <FormControlLabelText>Password</FormControlLabelText>
            </FormControlLabel>
            <Input className="my-1" size="md" style={{ position: 'relative' }}>
                <InputField
                    type={isPasswordVisible ? 'text' : 'password'}  // Conditionally set type based on visibility
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password"
                />
                {/* Eye Icon on the right */}
                <TouchableOpacity onPress={togglePasswordVisibility} style={{ position: 'absolute', right: 10, top: 12 }}>
                    {isPasswordVisible ? (
                        <EyeOffIcon size={20} /> // Replace with your EyeOffIcon component
                    ) : (
                        <EyeIcon size={20} /> // Replace with your EyeIcon component
                    )}
                </TouchableOpacity>
            </Input>
            <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>{passwordError}</FormControlErrorText>
            </FormControlError>
        </FormControl>
    );
};

export default PasswordField;

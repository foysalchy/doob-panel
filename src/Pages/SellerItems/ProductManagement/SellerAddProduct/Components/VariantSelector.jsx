import React, { useState } from 'react';
import Select from 'react-select';

const Checkbox = ({ children, ...props }) => (
    <label style={{ marginRight: '1em' }}>
        <input type="checkbox" {...props} />
        {children}
    </label>
);

const VariantSelector = () => {
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRtl, setIsRtl] = useState(false);

    const colourOptions = [
        { value: 'black', label: 'Black', color: '#0000', isFixed: true },
        { value: 'matte black', label: 'Matte Black', color: '#0000', isDisabled: true },
        { value: 'jet black', label: 'Jet Black', color: '#000' },
        { value: 'wither black', label: 'Wither Black', color: '#FF5630', isFixed: true },
        { value: 'glitter black', label: 'Glitter Black', color: '#FF8B00' },
        { value: 'light black', label: 'Light Black', color: '#FFC400' },
        { value: 'Deep Black', label: 'GDeep black', color: '#36B37E' },
        { value: 'Red and Black', label: 'Red and Black', color: '#00875A' },
        { value: 'Anther Black', label: 'Anther Black', color: '#253858' }
    ];
    return (
        <>
            <Select
                className="basic-single"
                classNamePrefix="select"
                defaultValue={colourOptions[0]}
                isDisabled={isDisabled}
                isLoading={isLoading}
                isClearable={isClearable}
                isRtl={isRtl}
                isSearchable={isSearchable}
                name="variation_selector"
                options={colourOptions}
            />

            <div
                style={{
                    color: 'hsl(0, 0%, 40%)',
                    display: 'inline-block',
                    fontSize: 12,
                    fontStyle: 'italic',
                    marginTop: '1em',
                }}
            >
                <Checkbox
                    checked={isClearable}
                    onChange={() => setIsClearable((state) => !state)}
                >
                    Clearable
                </Checkbox>
                <Checkbox
                    checked={isSearchable}
                    onChange={() => setIsSearchable((state) => !state)}
                >
                    Searchable
                </Checkbox>
                <Checkbox
                    checked={isDisabled}
                    onChange={() => setIsDisabled((state) => !state)}
                >
                    Disabled
                </Checkbox>
                <Checkbox
                    checked={isLoading}
                    onChange={() => setIsLoading((state) => !state)}
                >
                    Loading
                </Checkbox>
                <Checkbox checked={isRtl} onChange={() => setIsRtl((state) => !state)}>
                    RTL
                </Checkbox>
            </div>
        </>
    );
}


export default VariantSelector;
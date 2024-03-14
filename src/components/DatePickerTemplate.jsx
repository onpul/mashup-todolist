import React, { useState } from 'react';
import DatePicker from 'react-native-date-picker';

function DatePickerTemplate() {
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);

    return (
        <>
            <DatePicker
                modal
                open={open}
                date={date}
                onConfirm={(date) => {
                    setOpen(false);
                    setDate(date);
                }}
                onCancel={() => {
                    setOpen(false);
                }}
            />
        </>
    );
}

export default DatePickerTemplate;

export const isString = (text: unknown): text is string => {
    return typeof text === "string" || text instanceof String;
};

export const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error("Incorrect or missing date: " + date);
    }

    return date;
};

export const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

export const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

export const isStringArray = (param: unknown): param is string[] => {
    if (Array.isArray(param)) {
        let somethingIsNotString = false;
        param.forEach((item) => {
            if (typeof item !== "string") {
                somethingIsNotString = true;
            }
        });
        return !somethingIsNotString;
    }
    return false;
};

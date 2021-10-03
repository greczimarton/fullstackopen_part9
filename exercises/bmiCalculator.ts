interface calculateBmiValues {
    heightInCM: number;
    weightInKG: number;
}

export const parseArgumentsBmi = (
    args: Array<string>,
    numberOfArgs: number,
    indexOfData: Array<number>
): calculateBmiValues => {
    if (args.length < numberOfArgs) throw new Error("Not enough arguments!");
    if (args.length > numberOfArgs) throw new Error("Too many arguments!");

    if (
        !isNaN(Number(args[indexOfData[0]])) &&
        !isNaN(Number(args[indexOfData[1]]))
    ) {
        return {
            heightInCM: Number(args[indexOfData[0]]),
            weightInKG: Number(args[indexOfData[1]]),
        };
    } else {
        throw new Error("Provided values were not numbers!");
    }
};

export const calcuateBmi = (heightInCM: number, weightinKG: number): string => {
    const bmi = weightinKG / Math.pow(heightInCM / 100, 2);

    if (18.5 < bmi && bmi < 25) {
        return "normal (healthy weight)";
    }
    if (bmi < 30) {
        return "overweight";
    }
    if (bmi < 40) {
        return "important (obesity)";
    } else {
        return "severe (morbid obesity";
    }
};
try {
    const { heightInCM, weightInKG: weightinKG } = parseArgumentsBmi(
        process.argv,
        4,
        [2, 3]
    );
    console.log(calcuateBmi(heightInCM, weightinKG));
} catch (e) {
    console.log(
        "Error, something bad happened, message: ",
        (e as Error).message
    );
}

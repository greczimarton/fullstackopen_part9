interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface calculateExercisesInput {
    exerciseHourArray: Array<number>;
    target: number;
}

export const parseArgumentsExercises = (
    args: Array<string>,
    targetParam?: number,
    exerciseHourArrayParam?: Array<number>
): calculateExercisesInput => {
    console.log(targetParam);

    if ((!targetParam || !exerciseHourArrayParam) && args.length < 4) {
        console.log("bad");

        throw new Error("parameters missing");
    }

    const target = targetParam || Number(args[2]);

    const exerciseHourArray =
        exerciseHourArrayParam ||
        args.slice(3, args.length).map((t) => Number(t));

    if (!isNaN(Number(target))) {
        return {
            exerciseHourArray: exerciseHourArray,
            target: Number(target),
        };
    } else {
        throw new Error("malformatted parameters");
    }
};

export const calculateExercises = (
    exerciseHourArray: Array<number>,
    target: number
): Result => {
    const average =
        exerciseHourArray.reduce((num, sum) => num + sum) /
        exerciseHourArray.length;
    let rating;

    if (average < target / 2) {
        rating = 1;
    } else if (target / 2 <= average && average < target) {
        rating = 2;
    } else {
        rating = 3;
    }

    const ratingDescription =
        rating === 1
            ? "better luck next time"
            : rating === 2
            ? "not great not terrible"
            : "good job";

    return {
        periodLength: exerciseHourArray.length,
        trainingDays: exerciseHourArray.filter((t) => t !== 0).length,
        success: target === average,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average:
            exerciseHourArray.reduce((num, sum) => num + sum) /
            exerciseHourArray.length,
    };
};
try {
    const { exerciseHourArray, target } = parseArgumentsExercises(process.argv);
    console.log(calculateExercises(exerciseHourArray, target));
} catch (e) {
    console.log(
        "Error, something bad happened, message: ",
        (e as Error).message
    );
}

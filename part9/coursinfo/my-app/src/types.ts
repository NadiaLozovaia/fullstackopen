interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CoursePartDiscription extends CoursePartBase {
    description: string;
    kind: "basic" | "background" |"special";
}

interface CoursePartBasic extends CoursePartDiscription {
    kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group";
}

interface CoursePartBackground extends CoursePartDiscription {
    backgroundMaterial: string;
    kind: "background";
}
interface CoursePartSpecial extends CoursePartDiscription {
    requirements: string[];
    kind: "special";
}

export type CoursePart =  CoursePartBasic | CoursePartGroup | CoursePartBackground| CoursePartSpecial;
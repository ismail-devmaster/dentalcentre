import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef((props, ref) => {
    const { className, ...restProps } = props; // Destructure props
    return (
        <div
            ref={ref}
            className={cn(
                "rounded-lg border bg-card text-card-foreground shadow-sm",
                className
            )}
            {...restProps} // Spread the rest of the props
        />
    );
});
Card.displayName = "Card";

const CardHeader = React.forwardRef((props, ref) => {
    const { className, ...restProps } = props; // Destructure props
    return (
        <div
            ref={ref}
            className={cn("flex flex-col space-y-1.5 p-6", className)}
            {...restProps}
        />
    );
});
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef((props, ref) => {
    const { className, ...restProps } = props; // Destructure props
    return (
        <h3
            ref={ref}
            className={cn(
                "text-2xl font-semibold leading-none tracking-tight",
                className
            )}
            {...restProps}
        />
    );
});
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef((props, ref) => {
    const { className, ...restProps } = props; // Destructure props
    return (
        <p
            ref={ref}
            className={cn("text-sm text-muted-foreground", className)}
            {...restProps}
        />
    );
});
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef((props, ref) => {
    const { className, ...restProps } = props; // Destructure props
    return (
        <div ref={ref} className={cn("p-6 pt-0", className)} {...restProps} />
    );
});
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef((props, ref) => {
    const { className, ...restProps } = props; // Destructure props
    return (
        <div
            ref={ref}
            className={cn("flex items-center p-6 pt-0", className)}
            {...restProps}
        />
    );
});
CardFooter.displayName = "CardFooter";

export {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent,
};

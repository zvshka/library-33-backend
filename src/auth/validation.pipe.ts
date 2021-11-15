import * as Joi from "joi";
import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    NotImplementedException,
    Optional,
    PipeTransform
} from "@nestjs/common";
import * as Joiful from "joiful";
import {Constructor, getJoiSchema} from "joiful/core";

type Mergeable = Constructor<any> | Joi.AnySchema

@Injectable()
export class ValidationPipe implements PipeTransform {
    constructor(@Optional() private schemas?: Mergeable[], @Optional() private wrapSchemaAsArray?: boolean) {
    }

    // mergeSchemas(): Joi.AnySchema {
    //     return this.schemas
    //         .reduce((merged: Joi.AnySchema, current) => {
    //             const schema = current.hasOwnProperty("isJoi") && current["isJoi"]
    //                 ? current as Joi.AnySchema
    //                 : getJoiSchema(current as Constructor<any>, Joi);
    //             return merged
    //                 ? merged.concat(schema)
    //                 : schema;
    //         }, undefined) as Joi.Schema;
    // }
    //
    // validateAsSchema(value: any) {
    //     const {error} = Array.isArray(value) && this.wrapSchemaAsArray
    //         ? Joi.array().items(this.mergeSchemas()).validate(value)
    //         : this.mergeSchemas().validate(value);
    //     if (error) throw new BadRequestException("Validation failed");
    // }

    validateAsClass(value: any, metadata: ArgumentMetadata) {
        const {error} = Array.isArray(value)
            ? Joiful.validateArrayAsClass(value, metadata.metatype as Constructor<any>)
            : Joiful.validateAsClass(value, metadata.metatype as Constructor<any>);
        if (error) throw new BadRequestException("Validation failed", error.message);
    }

    transform(value: any, metadata: ArgumentMetadata) {
        // if (!metadata?.metatype && !this.schemas) throw new NotImplementedException("Missing validation schema");
        // if (this.schemas) this.validateAsSchema(value);
        if (isClass(metadata?.metatype)) this.validateAsClass(value, metadata);
        return value;
    }
}

function isClass(metatype) {
    return metatype === 'function' && /^\s*class\s+/.test(metatype.toString())
}
import { ValidatorID as ID } from '../../../validator-id'
import { ValidatorsDocsBuilder } from '../../builder';
import { ValidatorCategory, ValidatorSubCategory } from '../../categories';
import { RESOLUTION_TEXT } from '../texts';

export function setupAPI_SERVICE_CONNECTION_ERROR(builder: ValidatorsDocsBuilder) {

    builder
    .validator(ID.API_SERVICE_CONNECTION_ERROR)
    .category(ValidatorCategory.ApiServer)
    .title('Failure connecting to Kubernetes API Server')
    .description(
`
This error happens if Kubevious Agent fails to connect to Kubernetes API Services.
`)
        
}
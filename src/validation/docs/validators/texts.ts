

class ResolutionText
{
    checkPresentInSameNamespace(kind: string)
    {
        return `Check if the ${kind} is present in the same namespace.`
    }

    checkInDifferentNamespace(kind: string, ownerKind: string)
    {
        return `Check if the ${kind} is present in a different namespace.
            Kubevious Search can be a very handy tool to find ${kind}s across namespaces.
            You cannot mount a ${kind} from a different namespaces.
            In that case you would need to create a ${kind} in namespace where the ${ownerKind} resides.`;
    }

    typoNameReference(kind: string, typoLocation: string)
    {
        return `Did you make a typo in the ${typoLocation}?
            Kubevious Search uses fuzzy logic to return results and can help with finding the correct ${kind}.`;
    }

    populateEnvVarsData(kind: string)
    {
        return `Populate data in the ${kind} so it is mapped as environment variables.`
    }

    deleteEnvVarsSource(kind: string)
    {
        return `Delete the empty ${kind} if indeed no environment variables are supposed to be sourced from that ${kind}.`
    }
}

export const RESOLUTION_TEXT = new ResolutionText();
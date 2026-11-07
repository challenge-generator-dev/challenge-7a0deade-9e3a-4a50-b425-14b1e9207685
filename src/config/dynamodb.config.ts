import { DynamoDBClient, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, DynamoDBDocumentClientConfig } from '@aws-sdk/lib-dynamodb';

function getClientConfig(): DynamoDBClientConfig {
    const region = process.env.AWS_REGION;
    if (!region) {
        throw new Error('AWS_REGION environment variable is required');
    }

    const config: DynamoDBClientConfig = {
        region: region
    };

    const endpoint = process.env.DYNAMODB_ENDPOINT;
    if (endpoint) {
        config.endpoint = endpoint;
        console.log(`[CONFIG] Using custom DynamoDB endpoint: ${endpoint}`);
    }

    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    
    if (accessKeyId && secretAccessKey) {
        config.credentials = {
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey
        };
        console.log('[CONFIG] Using AWS credentials from environment variables');
    } else if (!endpoint) {
        console.warn('[CONFIG] AWS credentials not provided - using default credential chain');
    }

    console.log(`[CONFIG] DynamoDB client configured for region: ${region}`);
    return config;
}

function getDocumentClientConfig(): DynamoDBDocumentClientConfig {
    return {
        marshallOptions: {
            removeUndefinedValues: true,
            convertClassInstanceToMap: true
        },
        unmarshallOptions: {
            wrapNumbers: false
        }
    };
}

export function createDynamoDBClient(): DynamoDBClient {
    const config = getClientConfig();
    return new DynamoDBClient(config);
}

export function createDynamoDBDocumentClient(client: DynamoDBClient): DynamoDBDocumentClient {
    const config = getDocumentClientConfig();
    return DynamoDBDocumentClient.from(client, config);
}

export function createDynamoDBClientWithConfig(): DynamoDBDocumentClient {
    const dbClient = createDynamoDBClient();
    return createDynamoDBDocumentClient(dbClient);
}

export function validateEnvironmentVariables(): void {
    const requiredVars = ['AWS_REGION', 'DYNAMODB_TABLE_NAME'];
    const missingVars: string[] = [];

    for (const varName of requiredVars) {
        if (!process.env[varName]) {
            missingVars.push(varName);
        }
    }

    if (missingVars.length > 0) {
        throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
    }

    console.log('[CONFIG] All required environment variables are set');
}

export function getTableName(): string {
    const tableName = process.env.DYNAMODB_TABLE_NAME;
    if (!tableName) {
        throw new Error('DYNAMODB_TABLE_NAME environment variable is required');
    }
    return tableName;
}

export function getRegion(): string {
    const region = process.env.AWS_REGION;
    if (!region) {
        throw new Error('AWS_REGION environment variable is required');
    }
    return region;
}
declare module "jsrsasign";

interface JwtHeader {
    alg: 'HS256' | 'HS384' | 'HS512' | 'RS256' | 'RS384' | 'RS512' | 'ES256' | 'ES384';
    typ: 'JWT';
}

interface JwtPayload {
    sub: any;
    iat?: number;
    nbf?: number;
    exp?: number;
    iss?: string;
    aud?: string;
    jti?: string;
    ['string']?: any;
}

interface Matomo {
    url: string;
    id: string;
    userName: string;
}

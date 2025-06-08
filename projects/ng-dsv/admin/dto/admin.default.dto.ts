import { AdminTabDto } from "./admin.dto";

export const ADMIN_COL = [
    { label: 'AUTH.FIELDS.CREATE_DATE', width: '145px', name: 'creationDate', date: true, order: true },
    { label: 'AUTH.FIELDS.ACTIVE', width: '70px', name: 'active', order: true },
];

export const ADMIN_PROFILE_M2M = {
    name: 'name',
    endPoint: 'profile',
    fields: 'name%',
    order: 'name',
    orderBy: 'asc',
};

export const ADMIN_INPUT = [
    { name: 'creationDate', label: 'AUTH.FIELDS.CREATE_DATE', type: 'datetime-local', required: false, className: 'width50' },
    { name: 'updatedDate', label: 'AUTH.FIELDS.UPDATE_DATE', type: 'datetime-local', required: false, className: 'width50' },
    {
        name: 'deletedDate',
        label: 'AUTH.FIELDS.DELETE_DATE',
        type: 'datetime-local',
        required: false,
        className: 'width50',
        disabled: true,
    },
    { name: 'active', label: 'AUTH.FIELDS.ACTIVE', type: 'switch', required: false, className: 'width50' },
];

export const ADMIN_USER: AdminTabDto[] = [
    {
        name: 'user',
        label: 'AUTH.USER:TITLE',
        findByChamps: 'username%And|Email%',
        sortBy: 'creationDate',
        sortByAsc: 'desc',
        cells: [
            { label: 'AUTH.FIELDS.LOGIN', name: 'username', order: true },
            { label: 'AUTH.FIELDS.EMAIL', width: '240px', name: 'email', order: true },
            { label: 'AUTH.FIELDS.PROFILES', name: 'profiles.name' },
            { label: 'AUTH.FIELDS.LAST_CONNEXION_DATE', width: '150px', name: 'lastConnexionDate', date: true, order: true },
            ...ADMIN_COL,
        ],
        form: [
            { name: 'username', label: 'AUTH.FIELDS.LOGIN', type: 'text', required: true },
            { name: 'password', label: 'AUTH.FIELDS.PASSWORD', type: 'password', required: false },
            { name: 'email', label: 'AUTH.FIELDS.EMAIL', type: 'text', email: true, required: true },
            {
                name: 'profiles',
                label: 'AUTH.FIELDS.PFOFILES',
                type: 'm2m',
                required: false,
                m2m: ADMIN_PROFILE_M2M,
                array: true,
            },
            { name: 'lastConnexionDate', label: 'AUTH.FIELDS.LAST_CONNEXION_DATE', type: 'datetime-local', required: false },
            { name: 'activationToken', label: 'AUTH.FIELDS.ACTIVATION_TOKEN', type: 'text', className: 'width50' },
            { name: 'emailActivation', label: 'AUTH.FIELDS.EMAIL_ACTIVIATION', type: 'switch', className: 'width50' },
            { name: 'identityToken', label: 'AUTH.FIELDS.IDENTITY_TOKEN', type: 'text', className: 'width50' },
            { name: 'identityTokenDateEnd', label: 'AUTH.FIELDS.IDENTITY_TOKEN_DATE', type: 'datetime-local', className: 'width50' },
            { name: 'googleId', label: 'AUTH.FIELDS.GOOGLE_ID', type: 'text', className: 'width50' },
            { name: 'facebookId', label: 'AUTH.FIELDS.FACEBOOK_ID', type: 'text', className: 'width50' },
            ...ADMIN_INPUT,
        ],
    },
];


export const ADMIN_PROFILE: AdminTabDto[] = [
    {
        name: 'profile',
        label: 'AUTH.PROFILE:TITLE',
        findByChamps: 'name%',
        sortBy: 'name',
        cells: [
            { label: 'AUTH.FIELDS.NAME', name: 'name', order: true },
            { label: 'AUTH.FIELDS.ROLES', name: 'roles', order: true },
            ...ADMIN_COL,
        ],
        form: [
            { name: 'name', label: 'AUTH.FIELDS.NAME', type: 'text', required: true },
            { name: 'roles', label: 'AUTH.FIELDS.ROLES', type: 'text', required: true },
            ...ADMIN_INPUT,
        ],
    },
];
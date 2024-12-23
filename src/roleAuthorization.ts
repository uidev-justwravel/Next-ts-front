const permissionTable = [
    {
        role: "admin",
        permissionedURL: ["/", "/user", "/leads", "/about", "/user/add"],
    },
    {
        role: "moderator",
        permissionedURL: ["/", "/user", "/about"],
    },
    {
        role: "user",
        permissionedURL: ["/", "/about"],
    },
];

export default function checkPermission(url: string, role: string): boolean {
    const rolePermissions = permissionTable.find((entry) => entry.role === role);

    if (rolePermissions) {
        return rolePermissions.permissionedURL.includes(url);
    }

    return false;
}

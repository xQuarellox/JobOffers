package pl.joboffers.joboffersapp.entity;




public enum Role {
    EMPLOYEE("Pracownik"),
    RECRUITER("Rekruter");

    private final String roleName;

    private Role(String roleName) {
        this.roleName = roleName;
    }

    public String getRoleName() {
        return roleName;
    }

    public static Role fromRoleName(String roleName) {
        for (Role role : Role.values()) {
            if (role.getRoleName().equalsIgnoreCase(roleName)) {
                return role;
            }
        }
        throw new IllegalArgumentException("Nieznana rola: " + roleName);
    }
}

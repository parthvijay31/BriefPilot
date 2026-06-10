DESIGNER_MAPPING = {
    "Brand Identity": {
        "name": "Priya",
        "team": "Brand Identity"
    },
    "Social Media": {
        "name": "Riya",
        "team": "Marketing Creatives"
    },
    "Presentation": {
        "name": "Sam",
        "team": "Presentations"
    }
}


def assign_designer(designer_type):
    return DESIGNER_MAPPING.get(
        designer_type,
        {
            "name": "Operations Team",
            "team": "General"
        }
    )
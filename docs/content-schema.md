# Content schema notes

Preferred exercise item structure:

```json
{
  "id": "unique_id",
  "exerciseType": "gap_fill",
  "prompt": "Ich habe länger warten ___.",
  "answer": "müssen",
  "choices": ["müssen", "gemusst", "musste", "muss"],
  "explanation": "Bei Modalverben im Perfekt benutzt man den Doppelinfinitiv.",
  "example": "Ich habe länger warten müssen.",
  "level": "B1",
  "tags": ["modalverben", "perfekt"]
}
```

Avoid raw nested objects in fields that the UI displays directly. Use strings or localized dictionaries.

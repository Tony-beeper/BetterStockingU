from cohere.classify import Example
examples = [
    Example("Apple officially fined $19 million for not including chargers with iPhones", "negative"),
    Example("Battery life of my iPhone 13 Pro improved significantly after this iOS 16.0.3 update! Anyone else experiencing the same?", "positive"),
    Example("An iPhone 14 Pro sent the message to Police, was designed for a car crash while the owner was on a roller coaster.", "positive"),
    Example("More #iOS16 bugs. It's getting ridiculous now", "negative"),
    Example("#Brazil Court Fines #Apple $19 million for shipping iPhones without chargers.", "negative")
]

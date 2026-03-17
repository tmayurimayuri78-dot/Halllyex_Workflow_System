def evaluate_rules(rules, amount):

    matched_rule = None
    highest_priority = -1
    default_rule = None

    for rule in sorted(rules, key=lambda x: x["priority"], reverse=True):

        condition = rule["condition"]

        if condition == "DEFAULT":
            default_rule = rule
            continue

        try:
            if eval(condition, {}, {"amount": amount}):

                if rule["priority"] > highest_priority:
                    highest_priority = rule["priority"]
                    matched_rule = rule

        except Exception:
            continue

    if matched_rule:
        return matched_rule
    else:
        return default_rule
    
    
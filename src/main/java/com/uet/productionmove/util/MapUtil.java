package com.uet.productionmove.util;

import java.util.Map;

public class MapUtil {
    public static <T> boolean containsAllKeys(Map<T, ?> map, Iterable<T> keys) {
        boolean isContainsAll = true;
        while (keys.iterator().hasNext()) {
            if (!map.containsKey(keys.iterator().next())) {
                isContainsAll = false;
                break;
            }
        }
        return isContainsAll;
    }
}

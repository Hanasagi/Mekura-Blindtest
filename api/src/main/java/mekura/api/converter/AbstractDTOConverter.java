package mekura.api.converter;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.LinkedHashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

public abstract class AbstractDTOConverter<F, T> {
    @Autowired
    protected DTOConverterService converter;


    public T convertFrom(F f, Class<T> t) {
        T bean = null;
        try {
            bean = t.newInstance();
            BeanUtils.copyProperties(f, bean);
        } catch (InstantiationException | IllegalAccessException e) {
            e.printStackTrace();
        }

        return bean;
    }

    public T convertFrom(F f, T t) {
        BeanUtils.copyProperties(f, t);

        return t;
    }

    public List<T> convertFrom(List<F> lF, Class<T> t) {
        List<T> lT = new LinkedList<>();

        for (F f : lF) {
            lT.add(convertFrom(f, t));
        }

        return lT;
    }

    public Set<T> convertFrom(Set<F> lF, Class<T> t) {
        Set<T> lT = new LinkedHashSet<>();

        for (F f : lF) {
            lT.add(convertFrom(f, t));
        }
        return lT;
    }

    public F convertTo(T t, Class<F> f) {
        F bean = null;

        try {
            bean = f.newInstance();
            BeanUtils.copyProperties(t, bean);
        } catch (InstantiationException | IllegalAccessException e) {
            e.printStackTrace();
        }

        return bean;
    }

    public List<F> convertTo(List<T> lT, Class<F> f) {
        List<F> lF = new LinkedList<>();

        for (T t : lT) {
            lF.add(convertTo(t, f));
        }

        return lF;
    }

    public Set<F> convertTo(Set<T> lT, Class<F> f) {
        Set<F> lF = new LinkedHashSet<>();

        for (T t : lT) {
            lF.add(convertTo(t, f));
        }

        return lF;
    }
}

24.0 Если мы знаем, что у нас есть некий объект, который надо типизировать, в котором все значения одного типа данных, то мы можем сокращать так:

interface fetchPizzasArgs {
    sortBy: string;
    order: string;
    category: string;
    search: string;
    currentPage: string;
}
// Т.о. мы говорим, что ключ (первым аргументом у нас строчные данные и значение, вторым, тоже строчные данные) сокращаем до:
interface fetchPizzasArgs = Record<string, string>

// Если бы значения у нас были все числа то было бы так:
interface fetchPizzasArgs = Record<string, number>
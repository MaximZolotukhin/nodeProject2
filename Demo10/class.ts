// Объявление класса
class Coord {
  // Свойство класса
  lat: number
  long: number

  // Метод класса
  computeDistance(newLat: number, newLong: number): number {
    return 0
  }

  // Конструктор говорит что данные свойста должны быть объявленные при инстансе класса
  constructor(lat: number, long: number) {
    this.lat = lat
    this.long = long
  }
}

// Инстанц класса
const point = new Coord(0, 1)
// Обращение к совйству класса
point.lat

// Наследование от класса
class MapLocation extends Coord {
  private _name: string

  /* 
  Геттеры и сеттеры, позволяют использовать дополнительную логику 
  при сохранении или чтении свойства
  Геттеры позволяют только считывать информацию из класса
  Сеттеры позволяют редактировать информацию в классе
  */
  get name() {
    return this._name
  }

  set name(name: string) {
    this._name = name
  }

  // override делает этот метод принадлежит родительскому классу
  // Случае изменения метода в родительском калссе, тут он будет подчеркнут как ошибка
  override computeDistance(newLat: number, newLong: number): number {
    return 0
  }

  constructor(lat: number, long: number, name: string) {
    super(lat, long) // Получение данны от родителького класса
    this.name = name
  }
}

// Имплементация классов от интерфейсов
// Указывает что класс реализует интерфейс
interface ILoggerService {
  log: (s: string) => void
}

// Имплементация классов от интерфейсов
// Указывает что класс реализует интерфейс
class Logger implements ILoggerService {
  log(s: string): void {
    console.log(s)
  }
}

// МОДИФИКАТОРЫ ДОСТУПА
/*
  public - доступен везде в классе, при наследование и в инстансе
  privet - доступен только внутри класса
  protected - доступен как в классе так и классе наследнике, но не в инстансе
*/

class MyClass {
  // Позволяет обратится с статическому методи или совойству не создавай инстаца класса
  static methodHello(): void {
    console.log('Привет')
  }
}

MyClass.methodHello()

//Классы так же могут работать с дженериками
class MyClass2<T> {
  a: T
}

const newInstance = new MyClass2<string>()
newInstance.a

// Абстрактные калссы
// От абстрактного классам можно наследоваться, но нельзя создать инстанц класса
abstract class Base {
  print(s: string) {
    console.log(s)
  }
  // Можно сделать абстрактные методы
  abstract newError(s: string): void
}

// Насделование от класса
class BaseExtends extends Base {
  newError(s: string) {
    console.log('Ё маё Работате')
  }
}

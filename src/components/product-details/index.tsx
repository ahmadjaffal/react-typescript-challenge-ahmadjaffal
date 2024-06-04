import React from 'react';
import { Product } from '../../hooks/useFetchProducts';
import productImage1 from '../../assets/images/products/01.png'

interface ProductDetailsProps {
    product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = (product) => {
    return (
        <div className="p-2 sm:p-4 bg-white rounded-lg shadow-4xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-4">
                {/* <!-- images slider goes here --> */}
                <img src={productImage1} className="w-full aspect-4/3 object-cover rounded-lg mb-8 sm:mb-0" alt="product img" />
                <div className="flex flex-col gap-4 col-span-2">
                    <article className="text-sm text-darker-300 leading-[1.8] ">
                        <div className="flx flex-col mb-6 gap-2">
                            <h1 className="text-xl md:text-3xl">سماعات apple AirPods Max  الاصدار الجديد</h1>
                            <small className="text-xs text-gray-500">الاصدار الاحدث و الافضل حتى اليوم</small>
                        </div>
                        <div className="flex flex-col sm:flex-row w-full my-4 gap-0 sm:gap-2">
                            <span className="font-medium text-md">2,250.00 SAR</span>
                            <span className="font-medium text-sm line-through text-gray-300">2,500.00 SAR</span>
                        </div>
                        <p>
                            لكن يجب أن أشرح لك كيف ولدت كل هذه الفكرة الخاطئة المتمثلة في إدانة السرور ومدح الألم ، وسأقدم لك وصفًا كاملاً للنظام ، وأشرح التعاليم الفعلية للمستكشف العظيم للحقيقة ، الباني البارع. السعادة البشرية. لا أحد يرفض أو يكره أو يتجنب المتعة نفسها ، لأنها متعة ، ولكن لأن أولئك الذين لا يعرفون كيفية السعي وراء المتعة يواجهون عواقب مؤلمة للغاية. ولا يوجد أيضًا أي شخص يحب أو يسعى أو يرغب في الحصول على الألم من نفسه ، لأنه ألم ، ولكن في بعض الأحيان تحدث ظروف يمكن أن يجلب له فيها الكدح والألم بعض المتعة الكبيرة. لنأخذ مثالا تافها ، أي منا يقوم بتمارين بدنية شاقة ، إلا للحصول على بعض المزايا منها؟ ولكن من له الحق في أن يخطئ في رجل يختار أن يستمتع بسرور ليس له عواقب مزعجة ، أو من يتجنب الألم الذي لا ينتج عنه متعة؟
                            من ناحية أخرى ، فإننا نشجب بسخط صالح ونكره الرجال الذين خدعهم سحر اللذة اللحظية وإحباطهم ، وأعمتهم الرغبة ، لدرجة أنهم لا يستطيعون التنبؤ بالألم والمتاعب التي لا بد أن تنجم عن ذلك ؛ واللوم المتساوي يقع على أولئك الذين يفشلون في أداء واجبهم بسبب ضعف الإرادة ، وهو نفس القول من خلال الانكماش من الكد والألم. هذه الحالات بسيطة للغاية وسهلة التمييز. في ساعة مجانية ، عندما تكون قدرتنا على الاختيار غير مقيدة وعندما لا شيء يمنعنا من القيام بما نفضله ، يجب الترحيب بكل متعة وتجنب كل ألم. ولكن في ظروف معينة وبسبب ادعاءات الواجب أو التزامات العمل ، سيحدث في كثير من الأحيان أنه يجب نبذ الملذات وقبول الإزعاج. لذلك يتمسك الرجل الحكيم دائمًا في هذه الأمور بمبدأ الاختيار هذا: فهو يرفض الملذات لتأمين ملذات أعظم أخرى ، وإلا فإنه يتحمل الآلام لتجنب الآلام السيئة
                        </p>
                    </article>
                    <div className="flex items-center justify-center gap-4">
                        <div className="flex shrink-0 items-center justify-center p-2 border border-1 border-gray-200 rounded-lg">
                            <button className="shrink-0 px-2 text-md text-gray-500">+</button>
                            <input type="number" value="1" className="w-[50px] flex-1 text-center appearance-none bg-transparent" />
                            <button className="shrink-0 px-2 text-md text-gray-500">-</button>
                        </div>
                        <button type="button" className="w-full h-[42px] bg-primary text-white flex-1 p-2 text-md rounded-md">إضافة للسلة</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;